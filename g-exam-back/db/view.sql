CREATE VIEW `user_view` AS uv
select a.id, a.pw, a.ready, b.id, b.pw, b.ready
from user_student as a, user_teacher as b

