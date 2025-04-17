# do logic
from parameter import ProjectileForSimulation,FieldSpec
import math
def calculaiton(ProjectileForSimulation : ProjectileForSimulation
                      ,BallDropper:BallDropper
                      ,Launcher:Launcher
                      ,Gearbox:Gearbox):
    ## t ตกถึงเครื่อง
    (ProjectileForSimulation.time_start)**2 = math.sqrt(BallDropper.drop_height-Launcher.launcher_height+(ProjectileForSimulation.gravity/2))
                                                        
    

    ## v ตกถึงเครื่อง
    ProjectileForSimulation.velocity_vertical_final = math.sqrt(2*(ProjectileForSimulation.gravity)*(BallDropper.drop_height-Launcher.launcher_height))
                                                                
    
    ## หาความเร็วไม้ 
    #Launcher.stick_velocity_initial = ((0.525/0.5)*Launcher.stick_velocity_final*Launcher.stick_angle_degree)
    Launcher.stick_velocity_final = ((Launcher.stick_velocity_initial*0.5)/(0.525*Launcher.stick_angle_degree))
    
    if(Launcher.stick_length != 0):
        Launcher.stick_angular_velocity = ((Launcher.stick_velocity_final/(2*math.pi*Launcher.stick_length))*60)
    
    
