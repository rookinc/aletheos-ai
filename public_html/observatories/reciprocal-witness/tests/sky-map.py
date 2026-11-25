"""Render the measured Galactic quadrupole and octupole. NumPy, SciPy >=1.15, Pillow."""
from hashlib import sha256
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.special import sph_harm_y

DATA = Path(__file__).resolve().parents[1] / "data"
COEFFICIENT_PIN = "0c5563d7836b13c1401b183a8bfa01a7a825b8d93d288f6c52ef8a74f2e69744"
STOPS = np.array([[42,62,133],[49,110,158],[129,189,201],[238,233,208],
                  [240,176,119],[211,108,77],[149,55,69]])


def temperature(longitude, latitude, coeff):
    # Real basis and order are those of the returning observer audit_wmap.py.
    colatitude = np.pi/2 - latitude
    result = np.zeros_like(longitude, dtype=float)
    k = 0
    for degree in (2,3):
        result += coeff[k] * sph_harm_y(degree, 0, colatitude, longitude).real
        k += 1
        for m in range(1, degree + 1):
            z = np.sqrt(2) * sph_harm_y(degree, m, colatitude, longitude)
            result += coeff[k] * z.real + coeff[k+1] * z.imag
            k += 2
    return result


def color(temp):
    return np.stack([np.interp(temp, np.linspace(-55,55,len(STOPS)), stops)
                     for stops in STOPS.T], axis=-1).round().astype(np.uint8)


def font(size):
    try:
        return ImageFont.truetype("DejaVuSans.ttf", size)
    except OSError:
        return ImageFont.load_default(size=size)


def render():
    source = (DATA/"sky-planck-coefficients.json").read_bytes()
    assert sha256(source).hexdigest() == COEFFICIENT_PIN
    coeff = json.loads(source)["coefficients"]["full_sky_nside_128"]
    w, h, rx, ry = 880, 508, 408, 204
    y, x = np.mgrid[:h,:w]
    xn, yn = (x+.5-w/2)/rx, -(y+.5-214)/ry
    inside = xn*xn + yn*yn <= 1
    # Inverse Mollweide. Galactic longitude increases to the viewer's left.
    theta = np.arcsin(yn[inside])
    lon = -np.pi * xn[inside] / np.cos(theta)
    lat = np.arcsin(np.clip((2*theta + np.sin(2*theta))/np.pi, -1, 1))
    t = temperature(lon, lat, coeff)
    rgb = np.zeros((h,w,3), dtype=np.uint8) + [15,26,34]
    c = color(t).astype(float)
    # Subtle graticule, every 60 degrees in longitude and 30 in latitude.
    ld = np.rad2deg(lon)
    bd = np.rad2deg(lat)
    line = ((np.abs((ld+30)%60-30) * np.cos(lat)<0.17) |
            (np.abs((bd+15)%30-15)<0.17))
    c[line] *= 0.74
    rgb[inside] = c
    rgb[436:450,180:700] = color(np.linspace(-55,55,520))[None,:,:]
    image = Image.fromarray(rgb.astype(np.uint8))
    draw = ImageDraw.Draw(image)
    for offset,text in [(180,"−55"),(440,"0"),(700,"+55 µK")]:
        draw.text((offset,455), text, font=font(24), fill="#e4e9e8", anchor="mt")
    image.save(DATA/"sky-planck.png",optimize=True)
    print(f"Map sample range {min(t):+.4f} to {max(t):+.4f} µK")


if __name__ == "__main__":
    render()
