interface TopEmployeeProps {
  topWorker: string | null;
  mostEfficient: string | null;
}

const TopEmployee: React.FC<TopEmployeeProps> = ({
  topWorker,
  mostEfficient,
}) => {
  return (
    <div>
      <div className="bg-blue-50 p-4 rounded-md shadow-sm mb-6 flex justify-between items-center">
        <div>
          <strong>Top Worker (Most Hours):</strong> {topWorker || "N/A"}
        </div>
        <div>
          <strong>Most Efficient (Units/Hour):</strong> {mostEfficient || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default TopEmployee;
