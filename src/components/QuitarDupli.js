const filtrarVentajasYdesventajas = (typesNames) => {
    const tipo1 = {};
    const double_from = new Set();
    const double_to = new Set();
    const half_from = new Set();
    const half_to = new Set();
    const no_from = new Set();
    const no_to = new Set();
    for(let i=0;i<typesNames.length;i++){
        for (let x = 0; x < typesNames[i].damage_relations.double_damage_from.length; x++) {
            double_from.add(typesNames[i].damage_relations.double_damage_from[x].name);
        }
        for (let x = 0; x < typesNames[i].damage_relations.double_damage_to.length; x++) {
            double_to.add(typesNames[i].damage_relations.double_damage_to[x].name);
        }
        for (let x = 0; x < typesNames[i].damage_relations.half_damage_from.length; x++) {
            half_from.add(typesNames[i].damage_relations.half_damage_from[x].name);
        }
        for (let x = 0; x < typesNames[i].damage_relations.half_damage_to.length; x++) {
            half_to.add(typesNames[i].damage_relations.half_damage_to[x].name);
        }
        for (let x = 0; x < typesNames[i].damage_relations.no_damage_from.length; x++) {
            no_from.add(typesNames[i].damage_relations.no_damage_from[x].name);
        }
        for (let x = 0; x < typesNames[i].damage_relations.no_damage_to.length; x++) {
            no_to.add(typesNames[i].damage_relations.no_damage_to[x].name);
        }
    }
    tipo1.double_damage_from = Array.from(double_from);
    tipo1.double_damage_to = Array.from(double_to);
    tipo1.half_damage_from = Array.from(half_from);
    tipo1.half_damage_to = Array.from(half_to);
    tipo1.no_damage_from = Array.from(no_from);
    tipo1.no_damage_to = Array.from(no_to);
    return tipo1;
}

export default filtrarVentajasYdesventajas;