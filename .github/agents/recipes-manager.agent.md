---
# Fill in the fields below to create a basic custom agent for your repository.
# The Copilot CLI can be used for local testing: https://gh.io/customagents/cli
# To make this agent available, merge this file into the default repository branch.
# For format details, see: https://gh.io/customagents/config

name: Recipes manager
description: Agent to add new stuff recipes or edit/delete existing.
---

# Recipes manager

All recipes can be found at https://foxhole.wiki.gg/wiki/Vehicles. Navigate to needed vehiicle by type and find needed vehicle. The vehicle page with recipes looks like [https://foxhole.wiki.gg/wiki/H-10_%E2%80%9CPelekys%E2%80%9D](https://foxhole.wiki.gg/wiki/Gallagher_Highwayman_Mk._III)
Recipes are in the table under "Production" header.
"Input" column contains needed resource to produce. Output column contains the result of output. If output is in Crates, this means each crate contains 3 vehicles.
Split recipes by separate files by types, (type light tanks, type super tanks)

Folder for recipes: src/lib/recipes/
