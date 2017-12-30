import json
import sys

NAME_KEY = 'Move'

def main(filename, output_filename):
    text = None
    with open(filename) as f:
        text = f.read()
    moves = [move.strip() for move in text.split('-------------------------------------')]
    moves = list(filter(len, moves))[1:]
    data = []
    for move in moves:
        move_data = {}
        lines = [line.strip() for line in move.split('\n')]
        move_name = lines[0]
        move_data[NAME_KEY] = move_name
        key = None
        sub_key = None
        for line in lines[1:]:
            if ':' in line:
                key, value = line.split(':')
                if sub_key:
                    move_data[sub_key][key.strip()] = value.strip()
                else:
                    move_data[key] = value.strip()
            elif line.startswith('--') and line.endswith('--'):
                sub_key = line.strip('-')
                move_data[sub_key] = {}
            elif len(line) == 0:
                key = sub_key = None
            elif sub_key:
                move_data[sub_key][line] = None
            elif key:
                move_data[key] += '\n' + line
            else:
                move_data[line] = None
        data.append(move_data)
    with open(output_filename, 'w') as f:
        json.dump(data, f, indent=2)

if __name__ == '__main__':
    # C:/Users/ycz/Documents/Samus_frames_6.4.06.txt
    filename = sys.argv[1]
    output_filename = 'C:/Users/ycz/Desktop/moves.json'
    if len(sys.argv) > 2:
        output_filename = sys.argv[2]
    main(filename, output_filename)