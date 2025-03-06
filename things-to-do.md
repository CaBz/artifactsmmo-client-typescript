# Roadmap for success

1. Finish generating all entities
1. Add logic to figure out the best equipment to beat a monster (Combo of building dynamic sets + fight simulator)
1. Remove hardcoded list of point of interests and convert into auto-generated values
1. Remove dynamizable workflows from the static workflows
1. Reduce calls to get character status by passing the value between all workflow actions
1. Build a on-the-fly workflow based on updated context and make actions less generic


Review a workflow for fight that:

1. Actions to get the best healing potion from bank items -> MAX inventory
   2. Need to code logic to return the best utility based on current level / alchemy level?
   3. Should Gather + Craft?
   3. Go to bank
   3. Withdraw
   3. Equip
2. Actions to get the best consumables -> 90% inventory
   2. Need to code logic to return the best utility based on current level / alchemy level?
   3. Should Gather + Craft?
   3. Go to bank
   3. Withdraw
3. Move to fight point
4. fight
