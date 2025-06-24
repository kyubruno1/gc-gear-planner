import { ReactNode } from 'react'
import styles from './Page-container.module.css'
interface PageContainerProps {
  children: ReactNode,
  layoutType?: 'light' | 'dark'
}

export function PageContainer({ children, layoutType = 'light' }: PageContainerProps) {
  return (
    <div className={layoutType === 'dark' ? styles['dark-layout'] : styles['light-layout']}>
      {children}
    </div>
  )
}
