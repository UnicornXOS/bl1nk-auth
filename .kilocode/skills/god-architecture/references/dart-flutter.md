# 📘 Dart / Flutter Architecture & Best Practices Guide (2026)

**เวอร์ชัน:** 1.0.0
**สำหรับ:** god-architecture Skill

## 🛠️ Tech Stack (Latest 2026)
- **Flutter:** ^3.27.0
- **Dart:** ^3.6.0
- **State Management:** Riverpod ^2.6.0 / Bloc ^9.0.0
- **Navigation:** GoRouter ^14.0.0
- **HTTP:** Dio ^5.7.0 / http ^1.2.0
- **Local DB:** Isar ^4.0.0 / drift ^2.20.0
- **Code Gen:** Freezed ^2.5.0 + json_serializable ^6.8.0
- **Testing:** flutter_test + mocktail ^1.0.0

## 📁 Project Structure (Feature-based)
```text
lib/
├── core/
│   ├── constants/       # App constants, colors, dimensions
│   ├── errors/          # Exception classes, failure types
│   ├── network/         # Dio client, interceptors
│   ├── router/          # GoRouter configuration
│   └── utils/           # Helpers, extensions
├── features/
│   └── [feature_name]/
│       ├── data/
│       │   ├── datasources/  # Remote/Local data sources
│       │   ├── models/       # DTOs (Freezed + json_serializable)
│       │   └── repositories/ # Repository implementations
│       ├── domain/
│       │   ├── entities/     # Business entities (Freezed)
│       │   ├── repositories/ # Repository interfaces
│       │   └── usecases/     # Use cases (single responsibility)
│       └── presentation/
│           ├── pages/        # Screen widgets
│           ├── widgets/      # Feature-specific widgets
│           └── providers/    # Riverpod providers / Blocs
├── shared/
│   ├── widgets/          # Reusable UI components
│   └── providers/        # Global providers
└── main.dart
```

## 🏗️ Architecture Layers

### Clean Architecture (แนะนำสำหรับโปรเจกต์ขนาดกลาง-ใหญ่)
```
Presentation → Domain ← Data
```
- **Domain:** Business logic บริสุทธิ์ ไม่ขึ้นกับ Flutter
- **Data:** ติดต่อ API, database — implement domain interfaces
- **Presentation:** Widget, State management — ไม่มี business logic

### Riverpod Patterns
```dart
// Provider ประเภทที่ใช้บ่อย
@riverpod
Future<List<User>> userList(Ref ref) async {
  return ref.watch(userRepositoryProvider).getAll();
}

// NotifierProvider สำหรับ mutable state
@riverpod
class UserNotifier extends _$UserNotifier {
  @override
  AsyncValue<User?> build() => const AsyncValue.data(null);

  Future<void> fetchUser(String id) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() =>
      ref.read(userRepositoryProvider).getById(id));
  }
}
```

### Freezed Data Classes
```dart
@freezed
class User with _$User {
  const factory User({
    required String id,
    required String email,
    @Default('user') String role,
  }) = _User;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
}
```

## 🔴 Anti-patterns ที่พบบ่อย
| Anti-pattern | วิธีแก้ |
|---|---|
| Business logic ใน Widget | ย้ายไป UseCase / Notifier |
| setState ใน feature ซับซ้อน | ใช้ Riverpod / Bloc |
| ไม่ใช้ code generation | ใช้ Freezed + json_serializable |
| Navigator 1.0 (push/pop โดยตรง) | ใช้ GoRouter |
| ไม่แยก Layer | ใช้ Clean Architecture |

## 🔗 Reference Links
1. [Flutter Official Docs](https://docs.flutter.dev/)
2. [Riverpod — State Management](https://riverpod.dev/docs/introduction/getting_started)
3. [Riverpod Architecture Guide](https://codewithandrea.com/articles/flutter-app-architecture-riverpod-introduction/)
4. [Bloc Pattern for Flutter](https://bloclibrary.dev/architecture/)
5. [GoRouter — Navigation](https://pub.dev/packages/go_router)
6. [Freezed — Code Generation](https://pub.dev/packages/freezed)
7. [Very Good Architecture (VGV)](https://verygood.ventures/blog/very-good-flutter-architecture)
8. [Flutter Clean Architecture Patterns](https://resocoder.com/flutter-clean-architecture-tdd/)
