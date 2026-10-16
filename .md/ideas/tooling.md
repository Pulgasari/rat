# rat :: tooling

status: **idea**.

see also: [no build](no-build.md)

## idea: generators and checks (from laravel artisan)

**origin.** laravel's command line creates files with the right structure and runs
project tasks:

```sh
php artisan make:component Alert
php artisan route:list
```

**problem.** a new component means copying a file and adjusting names. checks (compile
every file, find unknown `$` names) need a place to live.

**in rat.**

```sh
rat new component todo-list    # src/todo-list.rat with a <script> and a <style>
rat check                      # compiles every .rat / .rat.js, reports errors with file:line:column
rat build                      # the build adapters
```

**cost.** small to start, grows with the build.
