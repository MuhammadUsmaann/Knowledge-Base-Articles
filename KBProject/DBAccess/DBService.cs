using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace KBProject.DBAccess
{
    public class DBService : IDisposable, IDBService
    {
        private SqlConnection _connection;
        private SqlTransaction _transaction;
        string ConnectionString = "";

        public DBService()
        {
            try
            {
                ConnectionString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["Connection"];

                MakeConnection();
            }
            catch (Exception)
            {
                throw;
            }
        }
        void MakeConnection()
        {
            if (_connection == null)
            {
                SqlConnection con = new SqlConnection(ConnectionString);
                _connection = con;

                if (Connection != null && _connection.State != ConnectionState.Open)
                    _connection.Open();
            }
        }
        public SqlConnection Connection
        {
            get
            {
                MakeConnection();
                return _connection;
            }
            protected set { _connection = value; }
        }
        public bool StartTransection()
        {
            if (Connection != null)
                _transaction = Connection.BeginTransaction();
            return true;
        }
        public bool RollBack()
        {
            if (_transaction != null)
                _transaction.Rollback();

            Dispose();

            return true;
        }
        public async Task<List<TResult>> ExecuteSP<TResult>(string spName, dynamic param = null, bool buffered = false)
        {
            try
            {
                var result = SqlMapper.Query<TResult>(Connection, spName, param, _transaction, commandType: CommandType.StoredProcedure);
                return result;
            }
            catch (Exception ee)
            {
                RollBack();
                throw ee;
            }
            finally
            {
                if (_transaction == null)
                {
                    Dispose();
                }
            }
        }
        public async Task<List<TResult>> ExecuteQuery<TResult>(string spName, dynamic param = null)
        {
            try
            {
                var result = SqlMapper.Query<TResult>(Connection, spName, param, _transaction);
                return result;
            }
            catch (Exception ee)
            {
                RollBack();
                throw ee;
            }
            finally
            {
                if (_transaction == null)
                {
                    Dispose();
                }
            }
        }
        public void SaveChanges()
        {
            try
            {
                _transaction.Commit();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                Dispose();
            }
        }
        protected void OpenConnection()
        {
            if (Connection != null && _connection.State != ConnectionState.Open)
                _connection.Open();
        }

        protected void CloseConnection()
        {
            if (_connection != null)
                _connection.Close();
        }

        public void Dispose()
        {
            if (_transaction != null)
                _transaction.Dispose();

            if (_connection != null)
            {
                CloseConnection();
                _connection.Dispose();
            }
            _transaction = null;
            _connection = null;
        }
    }
}
