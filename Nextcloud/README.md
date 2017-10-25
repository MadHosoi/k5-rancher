TODO

Download rackspace opencloud from

https://github.com/nextcloud/3rdparty/tree/master/rackspace/php-opencloud

Add a new class called FujitsuK5 as a copy of OpenStack.php file.

Modify the methods related to authentication, generateToken, getCredentials, etc..

Reference:

/lib/OpenCloud/Identity/Service.php

Modify files of Nextcloud/server:

Nextcloud/server/apps/files_external/lib/Lib/Storage/Swift.php
Nextcloud/server/apps/files_external/lib/Lib/Backend/Swift.php
Nextcloud/server/apps/files_external/lib/Lib/Auth/OpenStack/OpenStack.php

To access to the new class FujitsuK5 from OpenCloud
