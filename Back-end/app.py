from flask import Flask, request, jsonify
from flask_cors import CORS  # สำหรับแก้ปัญหา CORS
from parameter import Projectile, Launcher, BallDropper, Gearbox
from main import calculation  # Import the calculation function

app = Flask(__name__)
CORS(app)  # เปิดใช้งาน CORS

@app.route('/api', methods=['POST'])
def simulate():
    try:
        # รับข้อมูลจาก Front-end
        data = request.get_json()

        # ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
        required_keys = ['gravity', 'launcher', 'balldropper', 'gearbox']
        for key in required_keys:
            if key not in data:
                raise ValueError(f"Missing key: {key}")

        # สร้างออบเจ็กต์จากข้อมูลที่ได้รับ
        projectile = Projectile(gravity=data['gravity'])
        launcher = Launcher(**data['launcher'])
        balldropper = BallDropper(**data['balldropper'])
        gearbox = Gearbox(**data['gearbox'])

        # เรียกใช้ฟังก์ชัน calculation
        result = calculation(projectile, launcher, balldropper, gearbox)

        # ส่งผลลัพธ์กลับไปยัง Front-end
        return jsonify({'status': 'success', 'data': result})

    except Exception as e:
        # จัดการข้อผิดพลาดและส่งข้อความกลับไป
        return jsonify({'status': 'error', 'message': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
