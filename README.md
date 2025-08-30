# reactnative_assignment_project
assignment project

Code Review
issue: <FlatList data={data} renderItem={(item) => <Text>{item.title}</Text>}/>
fixed: <FlatList data={data} renderItem={({ item }) => <Text>{item.title}</Text>} />
Note: renderItem receives an object ({ item }), not just item.
