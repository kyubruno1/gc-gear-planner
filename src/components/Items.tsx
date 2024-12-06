export function Items({name}:{name: string}) {
    const imagePath = (fileName: string) => new URL(`../assets/images/equip-clean/${fileName}`, import.meta.url).href;
    return (
        <>
        <img src={imagePath(`${name}.png`)} alt={name}/>
        </>
    )
}