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
  const contact = await prisma.contact.findMany({});

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>List Contacts (Admin)</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contact.map((contact) => (
                <Col key={`Contact-${contact.firstName}`}>
                  <ContactCardAdmin {...contact} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
