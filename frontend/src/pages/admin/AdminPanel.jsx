import TeacherForm from '../../components/TeacherForm'
import TeacherList from '../../components/TeacherList';
import axios from 'axios';
 

function AdminPanel() {
  const handleSubmit = async (teacher) => {
    await axios.post('/api/teachers', teacher);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl my-4">Teacher Management</h1>
      <TeacherForm onSubmit={handleSubmit} />
      <TeacherList />
    </div>
  );
}

export default AdminPanel