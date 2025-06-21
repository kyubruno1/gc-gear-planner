import styles from './StatusDescription.module.css'

interface StatusDescriptionProps { }

export function StatusDescription(props: StatusDescriptionProps) {
  return (
    <div className={styles.equipsStatusDescription}>
      <div className={styles.column}>
        <h3>Equipamentos</h3>
        <div>
          <div className={styles.equipsProps}>
            <p>Armor</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
          </div>
          <div className={styles.equipsProps}>
            <p>Armor</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
          </div>
          <div className={styles.equipsProps}>
            <p>Armor</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
          </div>
          <div className={styles.equipsProps}>
            <p>Armor</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
          </div>
          <div className={styles.equipsProps}>
            <p>Armor</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
          </div>
          <div className={styles.equipsProps}>
            <p>Armor</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
          </div>
        </div>
      </div>
      <div className={styles.column}>
        <h3>Efeito de conjunto</h3>
        <div>
          <div className={styles.equipsProps}>
            <p>Conjunto</p>
            <p className={styles.checkedConjunto}>Efeito: <span>valor 1234</span></p>
            <p className={styles.checkedConjunto}>Efeito: <span>valor 1234</span></p>
            <p className={styles.checkedConjunto}>Efeito: <span>valor 1234</span></p>
            <p className={styles.checkedConjunto}>Efeito: <span>valor 1234</span></p>
            <p className={styles.checkedConjunto}>Efeito: <span>valor 1234</span></p>
            <p>Efeito: <span>valor 1234</span></p>
            <p>Efeito: <span>valor 1234</span></p>
            <p>Efeito: <span>valor 1234</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}