export default function Home() {
    return(<div>
    <h2>Panel de control</h2>

    <section className="mt-4 row">
        <div className="col-4">
            <article className="alert alert-success">Total de ventas</article>
        </div>
        <div className="col-4">
            <article className="alert alert-warning">Total de ventas</article>
        </div>
        <div className="col-4">
            <article className="alert alert-danger">Total de ventas</article>
        </div>
    </section>
    </div>
    )
}