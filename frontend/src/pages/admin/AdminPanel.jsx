import TeachersRegistration from './TeachersRegistration'
function AdminPanel() {
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl my-4">Teacher Management</h1>
      <TeachersRegistration />
    </div>
  );
}

export default AdminPanel