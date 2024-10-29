const Belajar = (data) => <h1 key={data.materi}>Belajar {data.materi}</h1>

const myElement = (
    <div>
        <Belajar materi="React"/>
        <Belajar materi="Java"/>
        <Belajar materi="C#"/>
    </div>
)

export default myElement;