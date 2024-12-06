export function Items() {
    const imagePath = (fileName: string) => new URL(`../assets/images/equip-clean/${fileName}`, import.meta.url).href;
    return (
        <>
        <img src={imagePath('helmet.png')} alt="Helmet"/>
        </>
    )
}