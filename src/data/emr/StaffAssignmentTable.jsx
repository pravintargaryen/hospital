const staffData = [
  { name: "John Doe", shift: "08:00 - 16:00", role: "Doctor" },
  { name: "Jane Smith", shift: "16:00 - 00:00", role: "Nurse" },
  // Add more data here
];

const StaffAssignmentTable = () => {
  return (
    <div>
      <h2>Staff Assignment Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Shift</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff, index) => (
            <tr key={index}>
              <td>{staff.name}</td>
              <td>{staff.shift}</td>
              <td>{staff.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffAssignmentTable;
