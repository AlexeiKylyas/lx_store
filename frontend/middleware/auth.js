export default function ({ store, redirect }) {
  // Если пользователь не авторизован
  if (!store.state.authorization.loggedIn) {
    return redirect('/admin/login')
  }
}
