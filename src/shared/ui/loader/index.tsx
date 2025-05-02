import s from './index.module.css'

function Loader() {

    return (
        <div className={s.main_catalog}>
            <div className={s.main_catalog_wrapper}>
            <div className={s.loader} />
            </div>
        </div>
    )
}

export default Loader
