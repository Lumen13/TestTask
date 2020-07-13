using TestTask.Data;
using TestTask.Data.IRepository;

namespace TestTask.EF.Repository
{
    public class Repository : IRepository
    {
        private ApplicationContext _appContext { get; set; }
        private string _webRootPath { get; set; }

        public Repository(string connectionString, string webRootPath)
        {
            _appContext = new ApplicationContext(connectionString);
            _webRootPath = webRootPath;
        }

        public void PushName(User user)
        {
            _appContext.Users.Add(user);
            _appContext.SaveChanges();
        }
    }
}
