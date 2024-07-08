#!/bin/bash

# In this Shell Script code snippet, a variable named DB_USER is being defined. The value of this variable is determined by an expression that uses the MYSQL_ENV_DB_USER variable.

# Here's what's happening step by step:

# The DB_USER variable is being defined using the variable=value syntax. In this case, the value has not been specified yet.

# The ${DB_USER:-$MYSQL_ENV_DB_USER} parameter substitution expression is used to determine the value of the DB_USER variable. This expression is known as parameter substitution.

# The parameter substitution ${DB_USER:-$MYSQL_ENV_DB_USER} has the following logic:

# If the DB_USER variable is defined and not empty, the value of DB_USER will be used.
# Otherwise, if the MYSQL_ENV_DB_USER variable is defined and not empty, the value of MYSQL_ENV_DB_USER will be used.
# If neither of the variables is defined or if both are empty, the value will be empty.
# Therefore, the value of the DB_USER variable will be set as the value of MYSQL_ENV_DB_USER if DB_USER is not defined or is empty. Otherwise, the value of DB_USER will remain the same.

# This approach allows the default value of the DB_USER variable to be overridden by the value of MYSQL_ENV_DB_USER if necessary. This can be useful in situations where you want to provide a default value but also allow it to be overridden by an environment variable or another externally defined value.

DB_USER=${DB_USER:-$MYSQL_ENV_DB_USER}
DB_PASS=${DB_PASS:-$MYSQL_ENV_DB_PASS}
DB_HOST=${DB_HOST:-$MYSQL_ENV_DB_HOST}
CURRENT_DATE=$(date +%Y-%m-%d_%H-%M-%S)
FOLDER_TO_SAVE_DEFAULT="/mysqldump"
FOLDER=${FOLDER_TO_SAVE:-$FOLDER_TO_SAVE_DEFAULT}

if [[ -z ${DB_USER} ]]; then
    echo "Missing DB_USER env variable"
    exit 1
fi
if [[ -z ${DB_PASS} ]]; then
    echo "Missing DB_PASS env variable"
    exit 1
fi
if [[ -z ${DB_HOST} ]]; then
    echo "Missing DB_HOST env variable"
    exit 1
fi

# Create the folder if it doesn't exist
mkdir -p $FOLDER || { echo "Failed to create the '${FOLDER}' directory"; FOLDER="/var/local"; }

FILE_PATH_NAME="${FOLDER}/${CURRENT_DATE}_dump.sql"

mysqldump -u ${DB_USER} -p${DB_PASS} -h ${DB_HOST} --all-databases > "${FILE_PATH_NAME}" 2>&1

# Verifica se o arquivo de dump foi criado
if [[ -f "${FILE_PATH_NAME}" ]]; then
    echo "Dump file created: ${FILE_PATH_NAME}"
else
    echo "Failed to create the dump file"
fi