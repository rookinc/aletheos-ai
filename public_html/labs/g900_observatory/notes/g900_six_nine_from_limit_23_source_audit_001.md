# G900 six nine from limit 23 source audit 001

Status: `six_nine_from_limit_23_source_audit_recorded`

## Question

Why does `from_limit=23` single out `06_09` without using labels, transition_profile, or support fields?

## Result

Verdict: `six_nine_from_limit_23_source_audit_passed`

Source status: `single_feature_from_limit_source_candidate_found`

Reading:

`A non-label, non-support source feature candidate singles out the uniform from_limit=23 package.`

## Best source candidate

`{"features": ["to_limit_profile"], "matching_keys": ["06_09"], "value": ["24:60"]}`

## From-limit 23 profile

`{"delta_edge_count_profile": "count=120;min=1;max=1;sum=120;distinct=1", "delta_vertex_count_profile": "count=120;min=0;max=1;sum=108;distinct=0,1", "pair_counts": {"03_09": 60, "06_09": 60}, "root_local_profile": "count=120;min=0;max=59;sum=3540;distinct=0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59", "root_profile": "12:0:1|12:1:1|12:10:1|12:11:1|12:12:1|12:13:1|12:14:1|12:15:1|12:16:1|12:17:1|12:18:1|12:19:1|12:2:1|12:20:1|12:21:1|12:22:1|12:23:1|12:24:1|12:25:1|12:26:1|12:27:1|12:28:1|12:29:1|12:3:1|12:30:1|12:31:1|12:32:1|12:33:1|12:34:1|12:35:1|12:36:1|12:37:1|12:38:1|12:39:1|12:4:1|12:40:1|12:41:1|12:42:1|12:43:1|12:44:1|12:45:1|12:46:1|12:47:1|12:48:1|12:49:1|12:5:1|12:50:1|12:51:1|12:52:1|12:53:1|12:54:1|12:55:1|12:56:1|12:57:1|12:58:1|12:59:1|12:6:1|12:7:1|12:8:1|12:9:1|9:0:1|9:1:1|9:10:1|9:11:1|9:12:1|9:13:1|9:14:1|9:15:1|9:16:1|9:17:1|9:18:1|9:19:1|9:2:1|9:20:1|9:21:1|9:22:1|9:23:1|9:24:1|9:25:1|9:26:1|9:27:1|9:28:1|9:29:1|9:3:1|9:30:1|9:31:1|9:32:1|9:33:1|9:34:1|9:35:1|9:36:1|9:37:1|9:38:1|9:39:1|9:4:1|9:40:1|9:41:1|9:42:1|9:43:1|9:44:1|9:45:1|9:46:1|9:47:1|9:48:1|9:49:1|9:5:1|9:50:1|9:51:1|9:52:1|9:53:1|9:54:1|9:55:1|9:56:1|9:57:1|9:58:1|9:59:1|9:6:1|9:7:1|9:8:1|9:9:1", "root_slot_profile": "count=120;min=9;max=12;sum=1260;distinct=9,12", "row_count": 120, "to_limit_profile": "24:120", "transition_profile": "3 -> 9:60|6 -> 9:60"}`

## Boundary

From-limit source audit only.

No transport admission.

No channel admission.

No viewer change.

No body mutation.

No force claim.

No physics claim.
