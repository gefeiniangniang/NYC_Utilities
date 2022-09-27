from flask import Flask, render_template, request
from werkzeug.utils import redirect
import json

app = Flask(__name__)

def get_preferences_context(context = None):
  preferences_data_json = open('preferences_data.json', 'r')
  preferences_data = json.loads(preferences_data_json.read())
  preferences_data_json.close()

  if context == None:
    context = dict()
  
  context["preferences"] = preferences_data
  return context


def get_expanded_dialog_context():
  expanded_dialog_data_json = open('expanded_dialog_data.json', 'r')
  expanded_dialog_data = json.loads(expanded_dialog_data_json.read())

  context = dict(
    expanded_dialog_data = expanded_dialog_data
  )
  return context

@app.route("/expanded_dialog/toggle_favorite", methods=["POST"])
def expanded_dialog_toggle_favorite():
  expanded_dialog_data_json = open('expanded_dialog_data.json', 'r')
  expanded_dialog_data = json.loads(expanded_dialog_data_json.read())
  expanded_dialog_data_json.close()

  id = request.json['id']
  if id not in expanded_dialog_data.keys():
    return {}, 400

  id_data = expanded_dialog_data[id]
  id_data['banner_data']['is_favorite'] = not id_data['banner_data']['is_favorite']
  expanded_dialog_data[id] = id_data

  expanded_dialog_data_json = open('expanded_dialog_data.json', 'w')
  expanded_dialog_data_json.write(json.dumps(expanded_dialog_data))
  expanded_dialog_data_json.close()
  return { 'is_favorite': id_data['banner_data']['is_favorite'] }, 200

@app.route("/preferences/toggle/<accessibility>", methods=["POST"])
def toggle_accessibility(accessibility):
  preferences_data_json = open('preferences_data.json', 'r')
  preferences_data = json.loads(preferences_data_json.read())
  preferences_data_json.close()
  preferences_data['accessibility'][accessibility] = not preferences_data['accessibility'][accessibility]
  preferences_data_json = open('preferences_data.json', 'w')
  preferences_data_json.write(json.dumps(preferences_data))
  preferences_data_json.close()
  return { 'is_active': preferences_data['accessibility'][accessibility] }, 200

@app.route("/togglelogin")
def toggle_login():
  preferences_data_json = open('preferences_data.json', 'r')
  preferences_data = json.loads(preferences_data_json.read())
  preferences_data_json.close()
  preferences_data['logged_in'] = not preferences_data['logged_in']
  preferences_data_json = open('preferences_data.json', 'w')
  preferences_data_json.write(json.dumps(preferences_data))
  preferences_data_json.close()
  return redirect("/")

@app.route("/")
def index():
  context = get_expanded_dialog_context()
  context = get_preferences_context(context)
  return render_template('index.html', **context)

@app.route("/home")
def home():
  return render_template('home.html')

if __name__ == '__main__':
  app.run(debug=True)