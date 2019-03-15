"""
Retreives user summary data given their GitHub username
"""

import dateutil.parser
import json
import requests
import sys

TOKEN = '39116152cab99c33d649154f481212616af0df3c'
HEADERS = headers = {'Authorization': 'token ' + TOKEN}

def get_user(username):
    """
    Returns JSON information for a given GitHub username
    Parameters
    ----------
    username : str
        GitHub username
    Returns
    -------
    response : json
        JSON object containing user information
    """
    r = requests.get('https://api.github.com/users/%s' % username,
                     headers=HEADERS)
    if r.ok:
        return r.json()
    else:
        raise ValueError('GitHub user %s not found' % username)


def get_user_summary(username):
    """
    Quickly returns a summary of user data.
    """
    # get repo url from username
    user_url = get_user(username)
    repo_url = user_url['repos_url'] + '?simple=yes&per_page=100&page=1'
    res = requests.get(repo_url, headers=HEADERS)
    # make sure we have all repos if count
    # exceeds 30
    repos = res.json()
    while 'next' in res.links.keys():
        res = requests.get(res.links['next']['url'], headers=HEADERS)
        repos.extend(res.json())

    # set up data structure to be returned
    data = {}
    data['user'] = username
    data['avatar'] = user_url['avatar_url']
    data['repos'] = []
    data['repo_count'] = 0
    data['languages'] = {}
    data['most_popular'] = (None, -1)  # repo name and stargazer count

    # iterate through repos and update data
    for r in repos:
        # append new repo
        data['repos'].append(r['full_name'])
        data['repo_count'] += 1
        # update language count
        if r['language'] in data['languages'].keys():
            data['languages'][r['language']] += 1
        else:
            data['languages'][r['language']] = 1
        # update most popular repos
        if r['stargazers_count'] > data['most_popular'][1]:
            data['most_popular'] = (r['full_name'], r['stargazers_count'])
    return json.dumps(data)


def get_repo_commits(username):
    """
    Gets commits made to user repositories
    """
    # get repo url from username
    repo_url = get_user(username)['repos_url'] + '?simple=yes&per_page=100&page=1'
    res = requests.get(repo_url, headers=HEADERS)
    # make sure we have all repos if count
    # exceeds 30
    repos = res.json()
    while 'next' in res.links.keys():
        res = requests.get(res.links['next']['url'], headers=HEADERS)
        repos.extend(res.json())

    commit_summary = {}
    commit_summary['day'], commit_summary['hour'] = {}, {}
    for i in range(0, 7):
        commit_summary['day'][i] = 0
    for i in range(0, 24):
        commit_summary['hour'][i] = 0

    # iterate through repos
    for r in repos:
        # for each repo, look through the commits
        commit_url = ('https://api.github.com/repos/%s/commits?author=%s'
                      % (r['full_name'], username))
        commits = requests.get(commit_url,
                               headers=HEADERS).json()
        # loop through commits to get timestamps
        for c in commits:
            date = dateutil.parser.parse(c['commit']['author']['date'])
            commit_summary['day'][date.weekday()] += 1
            commit_summary['hour'][date.hour] += 1

    day_new = {}
    for k, d in zip(range(0, 7), ['Monday', 'Tuesday', 'Wednesday',
                                  'Thursday', 'Friday', 'Saturday',
                                  'Sunday']):
        day_new[d] = commit_summary['day'][k]

    commit_summary['day'] = day_new

    return json.dumps(commit_summary)

def main():
    """
    Executes user summary and returns JSON object
    """
    user = sys.argv[1]
    data = sys.argv[2]

    if data == 'summary':
        print (get_user_summary(user))
    else:
        print (get_repo_commits(user))
    sys.stdout.flush()

if __name__ == '__main__':
    main()

