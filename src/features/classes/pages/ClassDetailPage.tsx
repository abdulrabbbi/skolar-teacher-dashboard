import { useParams } from "react-router-dom";

import { useTeacherClassrooms } from "../data/teacherClasses.storage";
import CustomClassroomDetailPage from "./classDetail/CustomClassroomDetailPage";
import StandardClassDetailPage from "./classDetail/StandardClassDetailPage";

export default function ClassDetailPage() {
  const { classId } = useParams<{ classId: string }>();

  const {
    classrooms,
    customClassrooms,
    updateClassroom,
    deleteClassroom,
    addStudent,
    removeStudent,
  } = useTeacherClassrooms();

  const classItem = classrooms.find((c) => c.id === classId);
  const customClassroom = customClassrooms.find((c) => c.id === classId);

  if (!classId || !classItem) {
    return <div className="text-slate-500">Class not found</div>;
  }

  if (customClassroom) {
    return (
      <CustomClassroomDetailPage
        classroom={customClassroom}
        onUpdateClassroom={updateClassroom}
        onDeleteClassroom={deleteClassroom}
        onAddStudent={addStudent}
        onRemoveStudent={removeStudent}
      />
    );
  }

  return <StandardClassDetailPage classItem={classItem} />;
}

