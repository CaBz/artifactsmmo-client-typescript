# Roadmap for success

## General:
1. Finish generating all entities
1. Add logic to figure out the best equipment to beat a monster (Combo of building dynamic sets + fight simulator)
1. Remove hardcoded list of point of interests and convert into auto-generated values
1. Remove dynamizable workflows from the static workflows
1. Reduce calls to get character status by passing the value between all workflow actions


## Bugs:
1. Need to add sub type when fetching consumables for food
2. Need to account for current inventory + bank quantity when looping thru items for crafting

## Improvements:
1. Have the fighter go cook before dumping stuff in the bank
2. Have the fighter cook stuff before going to fight

## Simulator:
1. Add support for monster effects
2. Add support for rune effects
3. Add simulation with consumables / utilities
