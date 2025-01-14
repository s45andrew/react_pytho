from flask import Flask, jsonify, request

app = Flask(__name__)

def read_from_file():
    with open('members.txt', 'r') as file:
        members = file.read().splitlines()
    return members

def write_to_file(members):
    with open('members.txt', 'w') as file:
        file.write("\n".join(members))

members_list = read_from_file()

@app.route('/members', methods=['GET'])
def get_members():
    return jsonify({"members": members_list})

@app.route('/members', methods=['POST'])
def add_member():
    new_member = request.json.get('member')
    if new_member:
        members_list.append(new_member)
        write_to_file(members_list)
        return jsonify({"message": "Member added successfully", "members": members_list}), 201
    return jsonify({"message": "Invalid member"}), 400

@app.route('/members/<string:member>', methods=['DELETE'])
def remove_member(member):
    if member in members_list:
        members_list.remove(member)
        write_to_file(members_list)
        return jsonify({"message": "Member removed successfully", "members": members_list}), 200
    return jsonify({"message": "Member not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
