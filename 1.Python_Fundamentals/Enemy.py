class Enemy:

    def  __init__(self,type_of_enemy, health_points,attack_damage ):
        self.type_of_enemy = type_of_enemy
        self.health_points = health_points
        self.attack_damage = attack_damage
    def talk(self):
        print(f'hey i can talk')