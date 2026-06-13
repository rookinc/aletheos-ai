window.G900_DATA = {
  views: {
    kernel: {
      title: "Kernel",
      caption: "The finite construction kernel: G15, G60, signed carriers, and half-flip.",
      paragraphs: [
        "The G900 candidate begins with a bounded kernel: a 15-slot graph, a 60-state fiber graph, a carrier signing, and a half-flip involution h(x) = x + 30 mod 60.",
        "The point of the kernel is discipline. The object is generated from finite ingredients before any visual or interpretive layer is allowed to speak."
      ],
      receipts: [
        ["G15", "15 slot vertices and 30 slot edges."],
        ["G60", "60 fiber states and 120 fiber edges."],
        ["Carrier law", "Slot edges couple fibers by identity or half-flip."],
        ["Half-flip", "h pairs local states into 30 opposite pairs and satisfies h^2 = id."]
      ]
    },
    object: {
      title: "Generated Object",
      caption: "The generated graph has 900 vertices, 3600 edges, and degree split 4 + 4.",
      paragraphs: [
        "The vertex set is V(G15) x V(G60), giving 15 x 60 = 900 vertices.",
        "The edge set combines internal fiber edges with carrier edges. Each vertex receives four internal neighbors and four carrier neighbors, so the graph is 8-regular."
      ],
      receipts: [
        ["Vertices", "900"],
        ["Edges", "3600 total: 1800 internal and 1800 carrier."],
        ["Degree", "8-regular with a 4 + 4 split."],
        ["Identity check", "Generated edge set equals the recorded canonical edge set."]
      ]
    },
    receipts: {
      title: "Receipts",
      caption: "Admission is closed by finite checks, not by visual persuasion.",
      paragraphs: [
        "The theorem package closes because the load-bearing claims are either kernel consequences or certificate-backed graph checks.",
        "The lab treats these checks as receipts. A rendering may guide attention, but the ledger is what carries the claim."
      ],
      receipts: [
        ["Edge identity", "Generated edges: 3600. Recorded edges: 3600. Missing: 0. Extra: 0."],
        ["Connectedness", "BFS reaches all 900 vertices and records 899 parent edges."],
        ["Metric certificate", "Diameter 8 and radius 6 by all-source BFS."],
        ["Ledger status", "Proved by kernel: 6. Certified: 7. Planned: 0. QED complete: true."]
      ]
    },
    compare: {
      title: "Compare",
      caption: "The canonical candidate separates from nearby baselines by exact invariants.",
      paragraphs: [
        "The untwisted baseline keeps G15 and G60 but replaces signed half-flip carriers with identity carriers. The canonical object separates from that baseline by diameter and radius.",
        "A sibling signing is also retained. It is not rejected as invalid. It is separated from the canonical object by switching obstruction and graph invariants."
      ],
      receipts: [
        ["Untwisted baseline", "Canonical diameter/radius: 8/6. Baseline diameter/radius: 9/9."],
        ["Sibling signing", "The sibling delta is not a coboundary, so it is not switching-equivalent."],
        ["Sibling graph", "Same 900 vertices and 3600 edges, but different eccentricity counts and distance distribution."],
        ["Discipline", "Difference is certified without claiming the sibling is meaningless or invalid."]
      ]
    },
    boundary: {
      title: "Boundary",
      caption: "A bounded theorem is stronger because it says what it does not claim.",
      paragraphs: [
        "The G900 admission theorem is intentionally bounded. It admits one explicit generated candidate by finite data and certificates.",
        "It does not claim uniqueness, census identity, physical interpretation, or invalidity of the sibling graph."
      ],
      receipts: [
        ["No uniqueness claim", "The theorem does not classify all possible signed carrier systems."],
        ["No census claim", "The object is not identified by external census lookup."],
        ["No physics claim", "The theorem does not attach a physical interpretation."],
        ["No proof by image", "The rendering is illustrative. The finite kernel and certificates carry the result."]
      ]
    }
  }
};
