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
  const contact = await prisma.contact.findMany({
    where: {
      owner,
    },
  });
  console.log(contact);
  return (
    <main>
      <h2 className="text-center pt-3">Contacts</h2>
      <Container id="list" fluid className="py-3">
          <Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contact.map((contact) => (
                <Col key={`Contact-${contact.firstName}`}>
                  <ContactCard {...contact} />
                </Col>
              ))}
            </Row>
          </Col>
      </Container>
    </main>
  );
};

export default ListPage;