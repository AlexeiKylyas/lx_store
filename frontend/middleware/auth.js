export default function ({ store, redirect }) {
  // Отримуємо токен із localStorage
  const token = localStorage.getItem('authToken');
  console.log('middleware token =>', token);

  // Якщо користувач не авторизований і токен відсутній у localStorage
  if (!store.state.authorization.loggedIn && !token) {
    console.log('Не авторизований користувач або відсутній токен');
    return redirect('/admin/login');
  }

  // Якщо токен є, але state в store не оновлений
  if (token && !store.state.authorization.loggedIn) {
    store.commit('authorization/SET_TOKEN', token);
    console.log('Токен знайдено та state оновлено');
  }
}
