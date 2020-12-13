import React, { useContext, useEffect } from 'react';
import { GithubContext } from '../context/github/githubContext';
import { Link } from 'react-router-dom';
import { Repos } from '../components/Repos';

export const Profile = ({ match }) => {
  const { getUser, getRepos, loading, repos, user } = useContext(GithubContext);
  const urlName = match.params.name;

  useEffect(() => {
    getUser(urlName);
    getRepos(urlName);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <p className={'text-center'}>Загрузка...</p>;
  }

  const {
    name,
    avatar_url,
    company,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    public_repos,
    public_gists,
    following,
  } = user;

  return (
    <>
      <Link to={'/'} className={'btn btn-link'}>
        На главную
      </Link>
      <div className={'card mb-4'}>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3 text-center">
              <img src={avatar_url} alt={name} style={{ width: '150px' }} />
              <h1>{name}</h1>
              {location && <p>Местоположение: {location}</p>}
            </div>
            <div className="col">
              {bio && (
                <>
                  <h3>BIO</h3>
                  <p>{bio}</p>
                </>
              )}
              <a
                href={html_url}
                className={'btn btn-dark'}
                rel="noreferrer"
                target={'_blank'}
              >
                Открыть профиль
              </a>
              <ul>
                {login && (
                  <li>
                    <strong>Username: </strong> {login}
                  </li>
                )}
                {company && (
                  <li>
                    <strong>Company: </strong> {company}
                  </li>
                )}
                {blog && (
                  <li>
                    <strong>Website: </strong> {blog}
                  </li>
                )}
              </ul>
              <div className={'badge badge-primary'}>
                Подписчики: {followers}
              </div>
              <div className={'badge badge-success'}>Подписан: {following}</div>
              <div className={'badge badge-info'}>
                Репозитории: {public_repos}
              </div>
              <div className={'badge badge-dark'}>Gists: {public_gists}</div>
            </div>
          </div>
        </div>
      </div>
      <Repos repos={repos} />
    </>
  );
};
