import faker from "@faker-js/faker";

function Contact() {
    let urlRandom = faker.image.imageUrl();

    return (
        <>
            <h1>Contact Page</h1>
        </>
    );
}

export default Contact;
