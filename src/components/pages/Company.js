import Message from "../layout/Message";

function Company() {
    return(<div>
        <h1>
            <Message message="ASDASD" type="success"/>
            <button className="btn btn-accent">Accent</button>
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-neutral">asdasd</button>
        </h1>
    </div>)
}

export default Company;
