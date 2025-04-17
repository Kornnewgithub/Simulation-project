import math
class ProjectileForSimulation:
    def __init__(self, gravity=9.81, x_position_initial= float, y_position_initial=0.0,
                 x_position_final= float, y_position_final=None, velocity_vertical_initial=0.0,
                 velocity_horizontal_initial=None, velocity_vertical_final=None,
                 velocity_horizontal_final=None, time_start=0.00, total_time= int):
        self.gravity = gravity
        self.x_position_initial = x_position_initial
        self.y_position_initial = y_position_initial
        self.x_position_final = x_position_final
        self.y_position_final = y_position_final
        self.velocity_vertical_initial = velocity_vertical_initial
        self.velocity_horizontal_initial = velocity_horizontal_initial
        self.velocity_vertical_final = velocity_vertical_final
        self.velocity_horizontal_final = velocity_horizontal_final
        self.time_start = time_start
        self.total_time = total_time
    def set_initial_velocity_by_angle(self, v0, theta_degree):
        theta_radian = math.radians(theta_degree)
        self.velocity_horizontal_initial = v0 * math.cos(theta_radian)
        self.velocity_vertical_initial = v0 * math.sin(theta_radian)
        self.theta = theta_degree
class FieldSpec:
    def __init__(self, field_length=10.0, number_of_goal_area=5):
        self.field_length = field_length
        self.number_of_goal_area = number_of_goal_area
        self.area_ranges = self.divide_field_into_areas()

    def divide_field_into_areas(self):
        area_length = self.field_length / self.number_of_goal_area
        ranges = []
        for i in range(self.number_of_goal_area):
            start = i * area_length
            end = (i + 1) * area_length
            ranges.append((start, end))
        return ranges

    def get_area(self, position_x):
        for i, (start, end) in enumerate(self.area_ranges):
            if start <= position_x < end:
                return i + 1  
        return None  
    

    
class BallDropper:
    def __init__(self, drop_height=2.0,ball_weight = 1):
        self.drop_height = drop_height
        self.ball_weight = ball_weight
class Gearbox:
    def __init__(self, 
                 Driver_gear_1=1, Driver_gear_2=1, Driver_gear_3=1, Driver_gear_4=1, Driver_gear_5=1,
                 Driven_gear_1=1, Driven_gear_2=1, Driven_gear_3=1, Driven_gear_4=1, Driven_gear_5=1,
                 omega_driver=1,RPM_Motor = 150):
        self.RPM_motor= RPM_Motor
        self.Driver_gears = [Driver_gear_1, Driver_gear_2, Driver_gear_3, Driver_gear_4, Driver_gear_5]
        self.Driven_gears = [Driven_gear_1, Driven_gear_2, Driven_gear_3, Driven_gear_4, Driven_gear_5]
        self.omega_driver = omega_driver

    def gear_ratios(self):
        ratios = []
        for driver, driven in zip(self.Driver_gears, self.Driven_gears):
            if driver == 0:
                ratios.append(None)
            else:
                ratios.append(driven / driver)
        return ratios

    def total_gear_ratio(self):
        total = 1
        for ratio in self.gear_ratios():
            if ratio is not None:
                total *= ratio
        return total

    def final_angular_velocity(self):
        """คำนวณความเร็วเชิงมุมของเฟืองตามสุดท้าย (rad/s)"""
        ratio = self.total_gear_ratio()
        if ratio == 0:
            return 0
        return self.omega_driver / ratio


class Launcher:
    def __init__(self, launcher_height=0.25, launcher_length=1.5, launcher_width=0.5
                 , stick_length=0.75,stick_velocity_final= 1,stick_velocity_initial= 1
                 ,stick_angular_velocity = float,stick_angle_degree = math.cos(45)):
        self.launcher_height = launcher_height
        self.launcher_length = launcher_length
        self.launcher_width = launcher_width
        self.stick_length = stick_length
        self.stick_velocity_initial = stick_velocity_initial
        self.stick_velocity_final = stick_velocity_final
        self.stick_angular_velocity = stick_angular_velocity
        self.stick_angle_degree = stick_angle_degree

 

    

