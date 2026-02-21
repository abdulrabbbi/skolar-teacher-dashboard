
import PageHeader from '../../../shared/components/ui/PageHeader';
import Card from '../../../shared/components/ui/Card';
import ClassCard from '../components/ClassCard';
import { classes } from '../data/classes.mock';
import { Link } from 'react-router-dom';

export default function MyClassesPage() {
  return (
    <div className="space-y-6">
      
      {/* HEADER CARD (SAME STYLE AS ANALYTICS) */}
      <Card className="  p-4 sm:p-5
          transition-all duration-300 ease-in-out
          hover:shadow-lg">
        <PageHeader
          title="My Classes"
          subtitle="Manage your classes and monitor student progress"
        />
      </Card>

      {/* CLASSES GRID */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {classes.map((classItem) => (
          <Link
            key={classItem.id}
            to={`/teacher/classes/${classItem.id}`}
            className="block"
          >
            <ClassCard classItem={classItem} />
          </Link>
        ))}
      </div>
    </div>
  );
}
