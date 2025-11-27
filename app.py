from flask import Flask, render_template, jsonify
from data import services_data, projects_data, blogs_data, testimonials_data

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/service/<service_id>')
def service_detail(service_id):
    title = service_id.replace('-', ' ').title()
    return render_template('service_detail.html', title=title)

@app.route('/project/<project_id>')
def project_detail(project_id):
    title = project_id.replace('-', ' ').title()
    return render_template('service_detail.html', title=title)

@app.route('/api/services')
def services():
    return jsonify(services_data)

@app.route('/api/projects')
def projects():
    return jsonify(projects_data)

@app.route('/api/blogs')
def blogs():
    return jsonify({"blogs": blogs_data})

@app.route('/api/testimonials')
def testimonials():
    return jsonify(testimonials_data)

@app.route('/api/contact', methods=['POST'])
def contact():
    return jsonify({"success": True, "message": "Message received!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)