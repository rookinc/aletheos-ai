# Aletheos.ai Public Content Scope

Status: working site plan
Scope: public-facing Aletheos.ai content only

## Site identity

Aletheos.ai is the public research surface for CoRI and its projects.

It presents Thalean Action Theory, Thalean Graph Theory, coherence diagnostics, labs, papers, and audit artifacts in a way that public visitors can inspect.

It is not an internal reference hub, personal resume, business portfolio, or local project dashboard.

## Public visitor question

The site should answer:

What is CoRI studying, why does it matter, and where can I inspect the work?

## Public navigation

Preferred top navigation:

Home
Research
TAT
Labs
Audit
About

Research acts as the map to Graph, Papers, Coherence, and other research lanes.

## Public pages

### Home

Purpose:
Introduce CoRI and the accountable-structure thesis.

Core message:
CoRI studies how apparent patterns become accountable structures by testing whether they survive changed viewpoints, controlled perturbations, and traceable constraints.

### Research

Purpose:
Provide a map of the public research program.

Include:
TAT
Thalean Graph / TGT
Coherence diagnostics
Papers
Labs
Audit
Carefully bounded physics-facing probes

### TAT

Purpose:
Introduce Thalean Action Theory as the umbrella framework.

Core message:
Identity is not isolated substance. Identity is relational invariance under admissible change.

### Glossary

Purpose:
Provide stable public vocabulary.

Include:
TAT
TGT
thalion
existential relativity
discrete action
admissibility
boundary
witness
surface
coherence gap
field effect

### Graph

Purpose:
Present the Thalean graph as the central finite graph object.

Preserve:
AT4val[60,6]
Graph52002
G60/G30/G15
M
Q = MM^T = A^3 + 2A^2 + 2I
artifact-backed inspection

### Papers

Purpose:
List public papers and notes with status labels.

Status labels:
theorem-facing
working note
experimental
literature synthesis
speculative bridge

### Labs

Purpose:
Present interactive witness surfaces.

Must preserve:
public_html/labs/constructor/lab.html
public_html/labs/constructor/**
public_html/labs/informative_action/**

### Audit

Purpose:
Expose public artifacts, JSON, reports, and checkers.

### About CoRI

Purpose:
Explain CoRI method and research boundary.

Do not include:
Rook
TrimSetter
tdash3
Substack
personal resume
business portfolio

## Hard preservation rule

Do not delete or rewrite:

public_html/labs/constructor/
public_html/labs/constructor/lab.html
public_html/assets/thalean-constructor-preview.png
public_html/labs.php constructor links

## Excluded from public navigation

zarchive
zrecovered
scratch
server internals
bak
private local web hub
Rook
TrimSetter
tdash3
personal business history

## First cleanup principle

Keep the LAMP/PHP include structure, CSS, DOM patterns, and lab code basically the same.

This is a content and navigation cleanup, not a rebuild.

New pages are allowed, but working public labs must be preserved.
