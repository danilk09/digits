"use client";

import { Contact } from '@/lib/validationSchemas';
import { Card, Image } from "react-bootstrap";
import Link from 'next/link';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ContactCard = ({ id, firstName, lastName, address, image, description }: Contact) => (
    <Card className="h-100">
        <Card.Header>
            <Image src={image} width={75} alt="Contact Image" />
            <Card.Title>{firstName} {lastName}</Card.Title>
            <Card.Subtitle>{address}</Card.Subtitle>
        </Card.Header>
        <Card.Body>
            <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer as="div">
            <Link href={`edit/${id}`}>Edit</Link>
        </Card.Footer>
    </Card>  
);

export default ContactCard;