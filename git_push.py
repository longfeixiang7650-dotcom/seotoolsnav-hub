import json

with open('/tmp/daily_keys.json', 'r') as f:
    keys = json.load(f)

token = keys.get('GITHUB_TOKEN', '')

if not token:
    print("ERROR: No GitHub token found")
    exit(1)

# Set up git credentials using embedded URL approach
import subprocess
import os

# Configure git user
os.chdir('/home/edi/seotoolsnav-hub')

# Set git config
subprocess.run(['git', 'config', 'user.name', 'token'], capture_output=True)
subprocess.run(['git', 'config', 'user.email', 'token@users.noreply.github.com'], capture_output=True)

# Add all changed files
result = subprocess.run(['git', 'add', '-A'], capture_output=True, text=True)
print("git add:", result.returncode, result.stderr[:200] if result.stderr else "OK")

# Check status
result = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
print("Changed files:")
for line in result.stdout.split('\n')[:20]:
    if line.strip():
        print(f"  {line}")

# Commit
result = subprocess.run(['git', 'commit', '-m', 'Daily update: refine SpyFu and Constant Contact, add technical SEO fundamentals blog post, update sitemap'], capture_output=True, text=True)
print("git commit:", result.returncode)
print(result.stdout[:200])
if result.stderr:
    print(result.stderr[:200])

# Push using embedded URL
repo_url = f"https://token:{token}@github.com/longfeixiang7650-dotcom/seotoolsnav-hub.git"
result = subprocess.run(['git', 'push', repo_url, 'main'], capture_output=True, text=True, timeout=60)
print("git push:", result.returncode)
print(result.stdout[:500])
if result.stderr:
    print(result.stderr[:500])

# Clean - remove the url with token from git remote
subprocess.run(['git', 'remote', 'set-url', 'origin', 'https://github.com/longfeixiang7650-dotcom/seotoolsnav-hub.git'], capture_output=True)
print("Git remote URL reset")
