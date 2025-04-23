export default function ResultDisplay({ result }) {
  if (!result) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">ผลการคำนวณ</h2>
      <div className="grid grid-cols-2 gap-4">
        <div><strong>ความเร็วลูก:</strong> {result.velocity}</div>
        <div><strong>ความเร็วรอบ:</strong> {result.rpm}</div>
        <div><strong>โซนที่ลูกตก:</strong> {result.zone}</div>
        <div><strong>มุมไม้ตี (θ):</strong> {result.angle}°</div>
        <div><strong>รัศมีไม้ตี (r):</strong> {result.r} m</div>
        <div><strong>ความสูงของไม้ (z_robot):</strong> {result.z_robot} m</div>
        <div><strong>เป้าหมาย (x, y):</strong> ({result.goalX}, {result.goalY}) m</div>
        <div><strong>ตำแหน่งลูกตอนตกจริง:</strong> {result.hitY} m</div>
        <div><strong>ระยะพลาด:</strong> {result.missing} m</div>
      </div>
    </div>
  );
}