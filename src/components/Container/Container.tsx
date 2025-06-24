import { useEffect, useState } from "react";
import { CharacterStatus } from "../../context/AtkTotalContext";

interface Item extends CharacterStatus {
  name: string;
  img: string;
}

interface ContainerProps {
  type: string;
  onSelectItem: (item: Item) => void;
  onClose: () => void;
}

export function Container({ type, onSelectItem, onClose }: ContainerProps) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function loadItems() {
      console.log(type)
      try {
        const data = await import(`../../data/${type}.json`);
        setItems(data.default);
      } catch (error) {
        console.error(`Erro ao carregar dados do tipo ${type}`, error);
        setItems([]);
      }
    }
    loadItems();
  }, [type]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '750px',
          maxHeight: '750px',
          background: 'gray',
          color: 'red',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          borderRadius: '8px',
          overflowY: 'auto',
          padding: '20px',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 10, right: 10 }}
          aria-label="Fechar modal"
        >
          ✕
        </button>
        <h2 style={{ marginTop: 0 }}>{type}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {items.map(item => (
            <div
              key={item.name}
              style={{
                width: '150px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '5px',
                cursor: 'pointer',
              }} onClick={() => onSelectItem(item)}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{ width: '100%', height: 'auto' }}
                loading="lazy"
              />
              <h4>{item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
