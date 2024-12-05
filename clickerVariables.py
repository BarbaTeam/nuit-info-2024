

import random



"""
event chance depends on number of buildings bought
"""
from flask import Flash, jsonify, request
app = Flask(__name__)


class Event: 
    def __init__(self, status, damage, cost, chance): 
        self.status = status
        self.damage = damage
        self.cost = cost
        self.chance = chance
    def isActive(self): 
        return self.status
    def damage(self): 
        return self.damage
    def solve(self, payment): 
        if payment >= self.cost: 
            self.status = False
            return True
        else: 
            return False
    def activate(self, income): 
        limit = random.random()
        #lineair for now
        if income/100 > limit: 
            self.status = True
"""
class player: 
    def __init__(self, money, earning, eventChance, health):
        money = 0
        earning = 0
        eventChance = 1
        health = 100
"""

myevent = Event(False, 5, 15)
income = 10 #request with flask
health = 100

myevent.activate()

eventArray = []
eventArray.append(myevent)
while (health > 0): 
    for events in eventArray: 
        events.activate(income)
    

    
