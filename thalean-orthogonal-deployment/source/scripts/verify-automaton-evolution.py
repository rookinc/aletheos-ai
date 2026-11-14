#!/usr/bin/env python3
"""Independent direct matrix exponential for the browser's declared008 model."""
from pathlib import Path
import hashlib,json,subprocess
import numpy as np
from scipy.linalg import expm
ROOT=Path(__file__).resolve().parents[1]
times=[k/8 for k in range(17)]
code="const A=require('./src/automaton-model.js'),m=new A.Joint008(require('./src/automaton-joint-data.json'));console.log(JSON.stringify("+json.dumps(times)+".map(t=>m.sample(t))));"
samples=json.loads(subprocess.check_output(['node','-e',code],cwd=ROOT,text=True))
K=np.diag(np.full(31,15.0))
for j in range(30):K[j,j+1]=K[j+1,j]=-np.sqrt((j+1)*(30-j))/2
maximum=energy_error=0.0
for time,sample in zip(times,samples):
    amplitude=expm(1j*np.pi*time*K)[:,0]
    maximum=max(maximum,float(np.max(np.abs(np.abs(amplitude)**2-sample['weights']))))
    energy_error=max(energy_error,abs(float(np.vdot(amplitude,K@amplitude).real/2)-sample['energyOverKappa']))
assert maximum<1e-12 and energy_error<1e-11
result={'pass':True,'producer':'python3 scripts/verify-automaton-evolution.py','samples':len(times),'method':'SciPy direct expm of independently assembled 31x31 Hermitian generator; compared with actual JavaScript samples','max_norm_fraction_error':maximum,'max_energy_error':energy_error,'joint_data_sha256':hashlib.sha256((ROOT/'src/automaton-joint-data.json').read_bytes()).hexdigest(),'boundary':'Numerical diagnostic of the declared model; source exact algebra and closure certificates remain separate.'}
(ROOT/'provenance/automaton-ui-001/evolution-oracle.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result))
