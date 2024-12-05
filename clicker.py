from flask import Flask, jsonify, request

app = Flask(__name__)

# Initialize player's money and points per click
player_money = 0
points_per_click = 1

@app.route('/click', methods=['POST'])
def click():
    global player_money
    player_money += points_per_click
    return jsonify({'money': player_money})

@app.route('/money', methods=['GET'])
def money():
    return jsonify({'money': player_money})

@app.route('/buy_booster', methods=['POST'])
def buy_booster():
    global player_money, points_per_click
    booster_cost = request.json.get('cost')
    booster_points = request.json.get('points')
    
    if player_money >= booster_cost:
        player_money -= booster_cost
        points_per_click += booster_points
        return jsonify({'money': player_money, 'points_per_click': points_per_click})
    else:
        return jsonify({'error': 'Not enough money'}), 400

if __name__ == '__main__':
    app.run(debug=True)