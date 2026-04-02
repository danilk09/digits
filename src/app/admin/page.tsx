import { Col, Container, Row } from 'react-bootstrap';
import ContactCardAdmin from '@/components/ContactCardAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

const AdminPage = async () => {
  const session = await auth();
  adminProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  const contacts = await prisma.contact.findMany({});
  const notes = await prisma.note.findMany({});
  return (
    <main>
      <h2 className="text-center pt-3">Contacts</h2>
      <Container id="list" fluid className="py-3">
          <Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact, index) => (
                <Col key={`Contact-${contact.firstName}`}>
                  <ContactCardAdmin
                    key={index}
                    contact={contact}
                    notes={notes.filter(note => note.contactId === contact.id)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
      </Container>
    </main>
  );
};

export default AdminPage;