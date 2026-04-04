import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import ContactCard from '@/components/ContactCard';

/** Render a list of stuff for the logged in user. */
const ListPage = async () => {
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  const contacts = await prisma.contact.findMany({
    where: {
      owner,
    },
  });
  const notes = await prisma.note.findMany({
    where: {
      owner,
    },
  });
  console.log(contacts);
  return (
    <main>
      <h2 className="text-center pt-3">Contacts</h2>
      <Container id="list" fluid className="py-3">
          <Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact, index) => (
                <Col key={`Contact-${contact.firstName}`}>
                  <ContactCard
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

export default ListPage;